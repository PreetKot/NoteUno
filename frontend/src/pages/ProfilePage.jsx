import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeftIcon, UserIcon, MailIcon, EditIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-bold text-2xl shadow-lg">
                  {getUserInitials(user?.name)}
                </div>
                <div>
                  <h2 className="card-title text-2xl">{user?.name}</h2>
                  <p className="text-base-content/70">{user?.email}</p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <UserIcon className="size-4" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={user?.name || ""}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <MailIcon className="size-4" />
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    value={user?.email || ""}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                {!isEditing ? (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <EditIcon className="size-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-ghost"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setIsEditing(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h3 className="card-title">Account Statistics</h3>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Notes</div>
                  <div className="stat-value text-primary">0</div>
                  <div className="stat-desc">Created by you</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
