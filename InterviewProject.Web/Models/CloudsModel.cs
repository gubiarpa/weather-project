using System.Text.Json.Serialization;

namespace InterviewProject.Models
{
    public class CloudsModel
    {
        [JsonPropertyName("all")]
        public int All { get; set; }
    }
}
