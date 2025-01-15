import Link from "next/link";
import { cms } from "@/cms-facade";

const CmsNavigation = async () => {
  const cmsNavigation = await cms.navigation.rootNavigation();

  return cmsNavigation.map((n, i) => {
    return (
      <Link key={i} prefetch={false} href={n.link} className="hover:underline">
        {n.name}
      </Link>
    );
  });
};

export default CmsNavigation;
