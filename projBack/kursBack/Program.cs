namespace projBack
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuileder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuileder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}