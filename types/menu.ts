export type SubLink = {
  id: number;
  href: string;
  title: string;
  external: boolean;
};

export type Link = {
  id: number;
  href: string;
  text: string;
  external: boolean;
   subLink:[{
    id: number;
    href: string;
    title: string;
    external: boolean;
    }]
};

export type HeaderData = {
  id: number;
  logoLink: {
    id: number;
    image: { data: { attributes: { url: string } } };
    href: string;
  };
  link: Link[];
  cta: {
    id: number;
    href: string;
    text: string;
    external: boolean;
  };
};
