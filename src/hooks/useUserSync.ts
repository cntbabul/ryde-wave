import { useSupabase } from "@/hooks/useSupabase";
import { useUserStore } from "@/store/useStore";
import { useUser } from "@clerk/expo";
import { useEffect } from "react";

export const useUserSync = () => {
    const { user } = useUser();
    const setIsAdmin = useUserStore((state) => state.setIsAdmin);
    const authSupabase = useSupabase(); // ← authenticated client

    useEffect(() => {
        if (!user) return;
        syncUser();
    }, [user]);

    const syncUser = async () => {
        const { data, error } = await authSupabase
            .from("users")
            .select("clerk_id, is_admin")
            .eq("clerk_id", user!.id)
            .maybeSingle();

        if (error) {
            console.error("Error checking user:", error);
            return;
        }

        if (data) {
            setIsAdmin(data.is_admin ?? false);
            return;
        }

        const email = user?.emailAddresses?.[0]?.emailAddress || "";

        const { data: newUser } = await authSupabase
            .from("users")
            .upsert({
                clerk_id: user!.id,
                email: email,
                first_name: user!.firstName,
                last_name: user!.lastName,
                avatar_url: user!.imageUrl,
            }, { onConflict: "clerk_id" })
            .select("is_admin")
            .single();

        setIsAdmin(newUser?.is_admin ?? false);
    };
};