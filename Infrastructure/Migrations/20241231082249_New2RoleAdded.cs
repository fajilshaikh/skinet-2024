using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class New2RoleAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "dac260cf-e0a8-43d4-8c09-1e5db987f4bc", null, "Customer", "CUSTOMER" },
                    { "e81d9e83-46ac-450f-867a-2b08f1b765c6", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dac260cf-e0a8-43d4-8c09-1e5db987f4bc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e81d9e83-46ac-450f-867a-2b08f1b765c6");

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
    }
}
