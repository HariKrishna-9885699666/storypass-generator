import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const UserProfileFab = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full shadow-lg hover:scale-110 transition-transform">
          <Avatar>
            <AvatarFallback>HK</AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl">HK</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mt-2">My Profile</h2>
          </div>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          <div><span className="font-semibold">Name:</span> Hari Krishna Anem</div>
          <div><span className="font-semibold">Phone:</span> <a href="tel:+919885699666" className="text-primary hover:underline">+91 9885699666</a></div>
          <div><span className="font-semibold">City:</span> Hyderabad, India</div>
          <div><span className="font-semibold">Email:</span> <a href="mailto:anemharikrishna@gmail.com" className="text-primary hover:underline">anemharikrishna@gmail.com</a></div>
          <div><span className="font-semibold">Degree:</span> B.Tech (CSIT)</div>
          <div><span className="font-semibold">GitHub:</span> <a href="https://github.com/HariKrishna-9885699666" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HariKrishna-9885699666</a></div>
          <div><span className="font-semibold">LinkedIn:</span> <a href="https://linkedin.com/in/anemharikrishna" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">anemharikrishna</a></div>
          <div><span className="font-semibold">Blog:</span> <a href="https://hashnode.com/@anemharikrishna" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hashnode</a></div>
          <div><span className="font-semibold">Portfolio:</span> <a href="https://harikrishna.netlify.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">harikrishna.netlify.app</a></div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
);
