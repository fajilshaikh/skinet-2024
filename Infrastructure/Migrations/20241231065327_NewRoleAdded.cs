using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewRoleAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "66aac2e2-ef7b-4baa-9868-feece094d3fa", null, "Manager", "MANAGER" },
                    { "a528c221-f132-4fff-b046-1b93c03a423d", null, "Admin", "ADMIN" },
                    { "bbb9d0e1-868d-4a81-bf65-71f7ee1a82e9", null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "66aac2e2-ef7b-4baa-9868-feece094d3fa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a528c221-f132-4fff-b046-1b93c03a423d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbb9d0e1-868d-4a81-bf65-71f7ee1a82e9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "75abed6b-b440-4427-97b2-619c93f7eb2e", null, "Customer", "CUSTOMER" },
                    { "f8e17acd-11ad-4b17-b843-eeba0ebe1837", null, "Admin", "ADMIN" }
                });
        }
    }
}
