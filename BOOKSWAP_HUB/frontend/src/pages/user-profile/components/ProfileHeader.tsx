import Icon from '../../../components/AppIcon';

const ProfileHeader = ({ userData, onImageUpload, isUploading }: any) => {
    const handleFileSelect = (e: any) => {
        const file = e?.target?.files?.[0];
        if (file) {
            if (file?.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            if (!file?.type?.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            onImageUpload(file);
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-8 shadow-sm">
            <div className="h-32 bg-gradient-to-r from-primary/90 to-primary/70 relative">
                <div className="absolute -bottom-16 left-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-background border-4 border-background shadow-lg">
                            <img
                                src={userData?.avatar}
                                alt={userData?.avatarAlt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <label
                            htmlFor="avatar-upload"
                            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                        >
                            <Icon name="Camera" size={32} color="#FFFFFF" />
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                                disabled={isUploading}
                            />
                        </label>
                        {isUploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                                <Icon name="Loader2" size={32} color="#FFFFFF" className="animate-spin" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-20 px-8 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">{userData?.name}</h1>
                        <p className="text-muted-foreground mb-4 text-lg">{userData?.email}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                                <Icon name="Calendar" size={14} className="text-primary" />
                                <span className="text-foreground font-medium">Joined {userData?.memberSince}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                                <Icon name="MapPin" size={14} className="text-primary" />
                                <span className="text-foreground font-medium">{userData?.location}</span>
                            </div>
                            {userData?.emailVerified ? (
                                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                                    <Icon name="CheckCircle" size={14} />
                                    <span className="font-medium">Verified</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-3 py-1 bg-muted text-muted-foreground rounded-full border border-border">
                                    <Icon name="AlertCircle" size={14} />
                                    <span className="font-medium">Not Verified</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="flex-1 md:flex-none text-center px-6 py-3 bg-primary/5 rounded-xl border border-primary/10">
                            <div className="text-3xl font-bold text-primary">{userData?.stats?.booksListed}</div>
                            <div className="text-sm font-medium text-muted-foreground">Books Listed</div>
                        </div>
                        <div className="flex-1 md:flex-none text-center px-6 py-3 bg-primary/5 rounded-xl border border-primary/10">
                            <div className="text-3xl font-bold text-primary">{userData?.stats?.exchanges}</div>
                            <div className="text-sm font-medium text-muted-foreground">Exchanges</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;