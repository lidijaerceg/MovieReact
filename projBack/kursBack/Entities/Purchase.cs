namespace projBack.Entities
{
    public class Purchase
    {
        public int Id { get; set; }
        public int BuyAmount { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public int FinalCost { get; set; }
    }
}
