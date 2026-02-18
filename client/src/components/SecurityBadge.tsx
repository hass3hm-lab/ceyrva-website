import { Shield, Lock, CheckCircle } from "lucide-react";

/**
 * Security Badge Component
 * 
 * Displays security certifications and trust indicators
 * to demonstrate Ceyrva's commitment to data protection
 */

export default function SecurityBadge() {
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';

  return (
    <div className="space-y-4">
      {/* SSL/TLS Badge */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
        <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-green-900">SSL/TLS Encrypted</p>
          <p className="text-sm text-green-700">
            {isSecure 
              ? 'Your connection is secured with HTTPS encryption'
              : 'Connection security status'}
          </p>
        </div>
        <CheckCircle className="w-5 h-5 text-green-600" />
      </div>

      {/* Data Protection Badge */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-blue-900">Data Protection</p>
          <p className="text-sm text-blue-700">
            All personal information is encrypted and protected
          </p>
        </div>
        <CheckCircle className="w-5 h-5 text-blue-600" />
      </div>

      {/* Compliance Badge */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 border border-purple-200">
        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-purple-900">Compliance</p>
          <p className="text-sm text-purple-700">
            CCPA, GDPR, and privacy law compliant
          </p>
        </div>
        <CheckCircle className="w-5 h-5 text-purple-600" />
      </div>
    </div>
  );
}
