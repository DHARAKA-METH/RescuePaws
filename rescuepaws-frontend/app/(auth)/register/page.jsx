import Link from 'next/link'
import { PawPrint } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-navy-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PawPrint size={26} color="white" />
          </div>
          <h1 className="text-xl font-semibold text-[#1A2E42]">Create an account</h1>
          <p className="text-sm text-[#6B8499] mt-1">Join RescuePaws and help save dogs</p>
        </div>

        <div className="card space-y-4">
          <div>
            <label className="form-label">Full name</label>
            <input type="text" className="form-input" placeholder="Ashan Silva" />
          </div>
          <div>
            <label className="form-label">Role</label>
            <select className="form-input">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="form-label">Email address</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="Min. 8 characters" />
          </div>
          <div>
            <label className="form-label">Confirm password</label>
            <input type="password" className="form-input" placeholder="Re-enter password" />
          </div>

          <button className="btn-primary w-full py-3 text-sm">Create Account</button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D0DDE8]" />
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[#6B8499] mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-navy-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
