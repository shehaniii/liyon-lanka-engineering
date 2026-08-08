import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata={
title:"Liyon Lanka Engineering",
description:
"Professional Engineering and Construction Solutions"
}


export default function RootLayout({
children,
}:{
children:React.ReactNode
}){


return(

<html lang="en">

<body>


<Navbar/>


<main className="pt-20">

{children}

</main>


<Footer/>


</body>

</html>

)

}