import { useState } from "react";
import DashboardLayout from "../Organisms/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const sharedStyle =
  "w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white";

const FireblocksForm = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [existingToken, setExistingToken] = useState(false);

  const showTokenInput = agreeTerms && existingToken;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold">Fireblocks ERC20</h2>
          <div className="w-[500px] bg-white rounded-xl shadow-md p-6 space-y-6 ml-32">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-600 mb-1 block">Token Name</Label>
                <input
                     type="text"
                     className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white"
/>
              </div>
              <div>
                <Label className="text-gray-600 mb-1 block">Symbol</Label>
                <input
                     type="text"
                     className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 focus:ring-offset-white"
/>
              </div>
            </div>

            <div>
              <Label className="text-gray-600 mb-1 block">
                Select Minting Platform
              </Label>
              <Select defaultValue="native">
                <SelectTrigger className={sharedStyle}>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="native">NATIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-600 mb-1 block">Your Wallet</Label>
              <Select>
                <SelectTrigger className={sharedStyle}>
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallet1">No options Available</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-600 mb-1 block">Blockchain</Label>
              <Select defaultValue="polygon">
                <SelectTrigger className={sharedStyle}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-gray-100 p-4 rounded-md text-sm space-y-1">
              <div className="flex justify-between">
                <span>One-time costs</span>
                <span>€ 200</span>
              </div>
              <div className="flex justify-between">
                <span>Value Added Tax</span>
                <span>€ 40</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€ 240</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(val) => setAgreeTerms(Boolean(val))}
                  className="border border-gray-300 rounded-sm data-[state=checked]:bg-blue-400 data-[state=checked]:text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <Label htmlFor="terms" className="text-sm">
                  I confirm the{" "}
                  <a className="text-blue-600 underline" href="#">
                    Terms of service
                  </a>{" "}
                  and{" "}
                  <a className="text-blue-600 underline" href="#">
                    Privacy Disclaimer
                  </a>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="existing-token"
                  checked={existingToken}
                  onCheckedChange={(val) => setExistingToken(Boolean(val))}
                  className="border border-gray-300 rounded-sm data-[state=checked]:bg-blue-400 data-[state=checked]:text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <Label htmlFor="existing-token" className="text-sm">
                  I want to integrate an existing token
                </Label>
              </div>
            </div>

            {showTokenInput && (
              <div>
                <Label className="text-gray-600 mb-1 block">Token Address</Label>
                <input
                  className={sharedStyle}
                />
              </div>
            )}

            <Button className="w-full bg-[#009fe3] hover:bg-[#0086c2] text-white">
              Order
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FireblocksForm;
