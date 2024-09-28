using System.Text.Json.Serialization;

namespace InterviewProject.Models
{
    public class CoordModel
    {
        [JsonPropertyName("lat")]
        public double Lat { get; set; }

        [JsonPropertyName("lon")]
        public double Lon { get; set; }
    }
}
