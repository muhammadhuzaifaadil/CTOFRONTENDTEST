"use client"
import { ReactNode } from "react";
import Navbar from "../components/NavBar";
interface DashBoardLayoutProps {
  children: ReactNode;
}
const DashBoardLayout:React.FC<DashBoardLayoutProps>  = ({ children })=> {
  return (<>
  <Navbar />
  {children}
  </>
)
}

export default DashBoardLayout;