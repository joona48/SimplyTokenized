import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Organisms/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TokensStore = ({ type = "fireblocks" }) => {
  const navigate = useNavigate();

  const title = type === "custom" ? "ERC20 Custom" : "Fireblocks ERC20";
  const route = type === "custom" ? "/fireblocks-form?type=custom" : "/fireblocks-form?type=fireblocks";

  const handleOrderClick = () => {
    navigate(route);
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-center">
          <Card className="w-[600px]">
            <div className="flex justify-between items-center px-4 pt-4">
              <h3 className="text-lg font-bold">{title}</h3>
              <Button
                className="bg-blue-400 text-white hover:bg-blue-700"
                onClick={handleOrderClick}
              >
                Order
              </Button>
            </div>
            <CardContent className="p-4">
              <img
                src="/Image/Token Preview.png"
                alt="Token Preview"
                className="rounded-lg mb-4 w-full h-auto"
              />
              <p className="text-xl font-semibold">€ 200</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TokensStore;
