import NewOrderForm from "./_components/NewOrderForm";


export default function NewOrderPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">New Order</h1>
        <p className="text-muted-foreground">Fill in the details to create a new delivery order</p>
      </div>
        <NewOrderForm />
    </div>
  );
}