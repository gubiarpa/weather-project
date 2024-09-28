using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InterviewProject.Models
{
    public class ListModel
    {
        [JsonPropertyName("dt")]
        public int Dt { get; set; }

        [JsonPropertyName("main")]
        public MainModel Main { get; set; }

        [JsonPropertyName("weather")]
        public List<WeatherModel> Weather { get; set; }

        [JsonPropertyName("clouds")]
        public CloudsModel Clouds { get; set; }

        [JsonPropertyName("wind")]
        public WindModel Wind { get; set; }

        [JsonPropertyName("pop")]
        public double Pop { get; set; }

        [JsonPropertyName("snow")]
        public SnowModel Snow { get; set; }

        [JsonPropertyName("sys")]
        public SysModel Sys { get; set; }

        [JsonPropertyName("dt_txt")]
        public string DtTxt { get; set; }

        [JsonPropertyName("visibility")]
        public int? Visibility { get; set; }

        [JsonPropertyName("rain")]
        public RainModel Rain { get; set; }
    }
}
