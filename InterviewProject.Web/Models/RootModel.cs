using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace InterviewProject.Models
{
    public class RootModel
    {
        [JsonPropertyName("cod")]
        public string Cod { get; set; }

        [JsonPropertyName("message")]
        public int Message { get; set; }

        [JsonPropertyName("cnt")]
        public int Cnt { get; set; }

        [JsonPropertyName("list")]
        public List<ListModel> List { get; set; }

        [JsonPropertyName("city")]
        public CityModel City { get; set; }
    }
}
