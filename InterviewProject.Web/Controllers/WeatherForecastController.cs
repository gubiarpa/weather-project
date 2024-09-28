using InterviewProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace InterviewProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private static readonly HttpClient client = new HttpClient();

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // OpenWeather API URL
            string url = "https://api.openweathermap.org/data/2.5/forecast?lat=-11.598409&lon=-76.192075&appid=a61695628352b84bff27fdc69a5d37ad&units=metric#";

            // HTTP GET
            HttpResponseMessage response = await client.GetAsync(url);

            // Asegúrate de que la respuesta fue exitosa
            response.EnsureSuccessStatusCode();

            // Reading JSON Response
            string responseBody = await response.Content.ReadAsStringAsync();

            // Parse JSON Response to a RootModel object
            var rootModel = JsonSerializer.Deserialize<RootModel>(responseBody);

            // Returns 200 OK
            return Ok(rootModel);
        }
    }
}
