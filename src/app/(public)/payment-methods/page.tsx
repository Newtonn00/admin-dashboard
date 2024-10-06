'use client';
import PaymentMethodsTable from "@/components/Tables/PaymentMethodTable";


const PaymentMethodsTablePage = () => {
  return (

      <div 
        className="flex flex-col gap-10"
      >
        <PaymentMethodsTable />
      </div>

  );
};

export default PaymentMethodsTablePage;
