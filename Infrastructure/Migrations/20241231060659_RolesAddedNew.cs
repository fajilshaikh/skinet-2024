using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RolesAddedNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "361e5614-f0e2-475c-bc05-6427939d7b9b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ea7d6aad-1500-44c3-bb2e-335e837b8bcd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "75abed6b-b440-4427-97b2-619c93f7eb2e", null, "Customer", "CUSTOMER" },
                    { "f8e17acd-11ad-4b17-b843-eeba0ebe1837", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "75abed6b-b440-4427-97b2-619c93f7eb2e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8e17acd-11ad-4b17-b843-eeba0ebe1837");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "361e5614-f0e2-475c-bc05-6427939d7b9b", null, "Admin", "ADMIN" },
                    { "ea7d6aad-1500-44c3-bb2e-335e837b8bcd", null, "Customer", "CUSTOMER" }
                });
        }
    }
}
