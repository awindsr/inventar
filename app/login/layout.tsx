import type React from 'react';


const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <div className="login-container">
                    <header>
                        <h1>Login</h1>
                    </header>
                    <main>{children}</main>
                  
                </div>
            </body>
        </html>
    );
};

export default LoginLayout;
