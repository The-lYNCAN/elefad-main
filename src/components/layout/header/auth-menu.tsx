import Link from "@components/ui/link";
import React from "react";

interface Props {
  href: string;
  className?: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
}

const AuthMenu: React.FC<Props> = ({
  isAuthorized,
  href,
  className,
  btnProps,
  children,
  userObject
}) => {

  // console.log("HERE COMES NAV USER");
  // console.log(userObject);
  // console.log(isAuthorized);
  if(userObject){
    console.log(userObject.username);
    if(userObject.username === undefined){

    }else{
      isAuthorized = true
    }
    console.log("yah we have it");
  }else{
    // console.log("nah we don't have it");
    
  }
  
  return isAuthorized ? (
    <Link href={href} className={className}>
      {/* {children} */}
      {userObject.username}
    </Link>
  ) : (
    <button {...btnProps} />
  );
};

export default AuthMenu;
