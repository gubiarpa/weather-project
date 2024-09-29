using InterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace InterviewProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IMemoryCache _cache;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IMemoryCache cache)
        {
            _logger = logger;
            _cache = cache;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // OpenWeather API URL
            var url = "https://api.openweathermap.org/data/2.5/forecast?lat=-11.598409&lon=-76.192075&appid=a61695628352b84bff27fdc69a5d37ad&units=metric#";
            var cacheKey = "weatherKey";

            // Weather Response
            RootModel weatherForecast = new RootModel();

            if (!_cache.TryGetValue(cacheKey, out weatherForecast))
            {
                // HTTP GET
                HttpResponseMessage response = await client.GetAsync(url);

                // Asegúrate de que la respuesta fue exitosa
                response.EnsureSuccessStatusCode();

                // Reading JSON Response
                string responseBody = await response.Content.ReadAsStringAsync();

                // Parse JSON Response to a RootModel object
                weatherForecast = JsonSerializer.Deserialize<RootModel>(responseBody);

                // Set Cache Options
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromSeconds(180)) // 3 minutes
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(90))// 1.5 hours
                    .SetPriority(CacheItemPriority.Normal); // removes only if it's needed

                // Save Cache Value
                _cache.Set(cacheKey, weatherForecast, cacheEntryOptions);
            }


            // Returns 200 OK
            return Ok(weatherForecast);
        }
    }
}
