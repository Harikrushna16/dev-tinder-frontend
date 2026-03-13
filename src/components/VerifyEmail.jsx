import { Link, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          {status === "success" ? (
            <>
              <h2 className="card-title text-success text-2xl mb-2">
                Verification Successful!
              </h2>
              <p>
                {message ||
                  "Your email has been successfully verified. You can now log in to your account."}
              </p>
              <div className="card-actions justify-end mt-4">
                <Link to="/login" className="btn btn-primary">
                  Go to Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="card-title text-error text-2xl mb-2">
                Verification Failed
              </h2>
              <p>
                {message ||
                  "There was an error verifying your email. The link may be invalid or has expired."}
              </p>
              <div className="card-actions justify-end mt-4">
                <Link to="/login" className="btn btn-primary">
                  Go to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
