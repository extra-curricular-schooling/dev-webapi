﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECS.Models
{
    public class ExpiredAccessToken
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ExpiredTokenId { get; set; }

        [Required]
        public string ExpiredTokenValue { get; set; }

        [Required]
        public bool CanReuse { get; set; }
    }
}
