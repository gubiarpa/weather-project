using System.Text.Json.Serialization;

namespace InterviewProject.Models
{
    public class SnowModel
    {
        [JsonPropertyName("3h")]
        public double _3h { get; set; }
    }
}
