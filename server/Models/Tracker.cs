using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Tracker
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(30)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string UserEmail { get; set; } = string.Empty;

    [ForeignKey("UserEmail")]
    public User User { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
}
