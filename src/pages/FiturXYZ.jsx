import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"


export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Fitur XYZ" />
      <p>Ini fitur xyz</p>


      <Button>Simpan</Button>
      <Button variant="outline">Simpan</Button>


      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

     
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  

    </div>
  );
}
