using System.Text.Json.Serialization;

namespace InterviewProject.Models
{
    public class SysModel
    {
        [JsonPropertyName("pod")]
        public string Pod { get; set; }
    }
}
