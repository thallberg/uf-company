using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddProductBundle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductBundle_Products_BundleId",
                table: "ProductBundle");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductBundle_Products_ProductId",
                table: "ProductBundle");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductBundle",
                table: "ProductBundle");

            migrationBuilder.RenameTable(
                name: "ProductBundle",
                newName: "ProductBundles");

            migrationBuilder.RenameIndex(
                name: "IX_ProductBundle_ProductId",
                table: "ProductBundles",
                newName: "IX_ProductBundles_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductBundle_BundleId",
                table: "ProductBundles",
                newName: "IX_ProductBundles_BundleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductBundles",
                table: "ProductBundles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductBundles_Products_BundleId",
                table: "ProductBundles",
                column: "BundleId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductBundles_Products_ProductId",
                table: "ProductBundles",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductBundles_Products_BundleId",
                table: "ProductBundles");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductBundles_Products_ProductId",
                table: "ProductBundles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductBundles",
                table: "ProductBundles");

            migrationBuilder.RenameTable(
                name: "ProductBundles",
                newName: "ProductBundle");

            migrationBuilder.RenameIndex(
                name: "IX_ProductBundles_ProductId",
                table: "ProductBundle",
                newName: "IX_ProductBundle_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductBundles_BundleId",
                table: "ProductBundle",
                newName: "IX_ProductBundle_BundleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductBundle",
                table: "ProductBundle",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductBundle_Products_BundleId",
                table: "ProductBundle",
                column: "BundleId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductBundle_Products_ProductId",
                table: "ProductBundle",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
