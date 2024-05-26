const AuthLayout: React.Layout = ({ children }) => {
  return (
    <main className="flex h-[100dvh] w-[100dww] items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
