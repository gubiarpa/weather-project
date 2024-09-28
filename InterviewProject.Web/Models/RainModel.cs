using System.Text.Json.Serialization;

namespace InterviewProject.Models
{
    public class RainModel
    {
        [JsonPropertyName("3h")]
        public double _3h { get; set; }
    }
}
