using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDynamicweb(builder.Environment, builder.Configuration);

var app = builder.Build();
app.UseDynamicweb();

app.Run();
