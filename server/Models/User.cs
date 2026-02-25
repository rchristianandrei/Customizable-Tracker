using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class User
{
    [Key]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    public DateTime AddedAt { get; set; }

    public ICollection<Tracker> Trackers { get; set; } = [];
}
