
  import { Button } from "../components/ui/button"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
  import { Input } from "../components/ui/input"
  // import { Label } from "../components/ui/label"
  import { Link } from "react-router-dom"
  import { useNavigate } from "react-router-dom";
  import { db } from "../db"
  import { useLiveQuery } from "dexie-react-hooks"
  import { useState, type ChangeEvent } from "react"
  import { Field, FieldLabel,  FieldDescription } from "../components/ui/field"
  import ButtonSocialIconDemo from "../components/ui/social-icon";

  const Login = () => {
    const employeesdata = useLiveQuery(() => db.employeeslogin.toArray());
    const navigate = useNavigate();
    // async function deleterecod() {
    //   await db.employeeslogin.bulkDelete([1,2,3,4,5,6,7,8,9]);
    //   console.log(employeesdata)
    // }

    const [loginemail,setLoginuser]=useState('');
    const [loginpas,setLoginpas]=useState('');

    const [error,setError]=useState('');
    console.log(employeesdata)
    async function handellogin() {
      setError('')
      if(loginemail.trim()==="" || loginpas.trim()===""){
        setError("Username or Password is wrong");
        return;
      }
      const user=employeesdata?.find((item:any)=>item.emailid===loginemail && item.password===loginpas)
      if(user){
        await db.session.clear();
        await db.session.add({
          username:user.username,
          emailid:user.emailid,
        })
      navigate("/admin")
      }else{
        setError("Username or Password is wrong");
        return
      }
      
    }
    return (
      <>
      <div className="flex  h-screen w-full bg-gray-200   ">
      <div className='hidden lg:block lg:basis-1/2 bg-muted'>
        <img src='src\assets\images.png' className='h-full w-full '></img>
      </div>
      
        <div className='flex w-full  basis-full lg:basis-1/2 justify-center items-center px-4'>
        <Card className="mx-auto min-w-sm lg:min-w-lg bg-white/50">
          <CardHeader className='flex flex-col items-center'>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription className="text-black">Welcome Back!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {error && <p className="text-red-500 flex justify-center border-2 bg-red-300 py-2">{error}</p>}
              <div className="grid gap-2">
                <Field>
                  <FieldLabel htmlFor="input-required">
                    User Email<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input id="email" type="email" placeholder="m@example.com" required value={loginemail} onChange={(e:ChangeEvent<HTMLInputElement>)=>setLoginuser(e.target.value)} />
                  <FieldDescription>This field must be filled out.</FieldDescription>
              </Field>
                {/* <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={loginemail} onChange={(e:ChangeEvent<HTMLInputElement>)=>setLoginuser(e.target.value)} /> */}
              
              </div>
              <div className="grid gap-2">
                <Field>
                  <FieldLabel htmlFor="input-required">
                    Password<span className="text-destructive">*</span>
                  </FieldLabel>
                      <Input id="password" type="password" value={loginpas} onChange={(e:ChangeEvent<HTMLInputElement>)=>setLoginpas(e.target.value)}  />
                  <FieldDescription>This field must be filled out.</FieldDescription>
              </Field>
              </div>
              
              <Button type="button" className="w-full cursor-pointer" onClick={handellogin} >login</Button>
            </div>
          
          <div className="mt-4 text-center text-sm">
              New Here?{" "}
              <Link to='/'  className="underline cursor-pointer hover:text-blue-700">Create Account</Link>
              {/* <a href="/" className="underline">Sign Up</a> */}
            </div>
            <div className="mt-4 ">
              <ButtonSocialIconDemo   />
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
      {/* <button onClick={deleterecod}>deleterecod</button> */}
      </>
    )
  }

  export default Login

