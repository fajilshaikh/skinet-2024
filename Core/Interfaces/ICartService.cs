using System;
using Core.Entities;

namespace Core.Interfaces;

public interface ICartService
{
    Task<ShoppingCart?> GetCartAsync(string key);
    Task<ShoppingCart?> SetCartAsynce(ShoppingCart cart);
    Task<bool> DeleteCartAsynce(string key);

}
