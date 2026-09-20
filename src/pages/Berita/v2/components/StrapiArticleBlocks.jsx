import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { STRAPI_BASE_URL } from "../../../../config/strapi";

/**
 * Komponen perender konten Rich Text Blocks Strapi
 * Disesuaikan dengan panduan 'strapi.md' (contoh 2: Tailwind combo)
 * serta typography tema Magister Kenotariatan UNISSULA.
 */
export default function StrapiArticleBlocks({ content }) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  return (
    <div className="strapi-blocks-content text-body leading-relaxed">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="text-base sm:text-[16.5px] text-gray-700 leading-relaxed mb-5">
              {children}
            </p>
          ),
          heading: ({ children, level }) => {
            const Tag = `h${level}`;
            const styles = {
              1: "text-3xl sm:text-4xl font-heading font-bold text-heading mb-6 mt-8",
              2: "text-2xl sm:text-3xl font-heading font-bold text-heading mb-5 mt-7",
              3: "text-xl sm:text-2xl font-heading font-semibold text-heading mb-4 mt-6",
              4: "text-lg sm:text-xl font-heading font-semibold text-heading mb-3 mt-5",
              5: "text-base sm:text-lg font-heading font-semibold text-heading mb-2 mt-4",
              6: "text-base font-heading font-semibold text-heading mb-2 mt-3",
            };
            return (
              <Tag className={styles[level] || "text-xl font-bold mb-4"}>
                {children}
              </Tag>
            );
          },
          list: ({ children, format }) => {
            if (format === "ordered") {
              return (
                <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-700">
                  {children}
                </ol>
              );
            }
            return (
              <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-700">
                {children}
              </ul>
            );
          },
          "list-item": ({ children }) => (
            <li className="text-gray-700 leading-relaxed">{children}</li>
          ),
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-5 py-2 bg-gray-50/80 rounded-r">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-auto mb-5 font-mono text-sm">
              <code>{children}</code>
            </pre>
          ),
          image: ({ image }) => {
            const imageUrl = image?.url?.startsWith("http")
              ? image.url
              : `${STRAPI_BASE_URL}${image?.url || ""}`;
            return (
              <figure className="my-7">
                <img
                  src={imageUrl}
                  alt={image?.alternativeText || "Ilustrasi berita"}
                  className="rounded-lg max-w-full h-auto shadow-sm mx-auto"
                />
                {image?.caption && (
                  <figcaption className="text-xs text-center text-gray-500 mt-2 italic">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            );
          },
        }}
        modifiers={{
          bold: ({ children }) => (
            <strong className="font-bold text-heading">{children}</strong>
          ),
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => (
            <span className="underline">{children}</span>
          ),
          strikethrough: ({ children }) => (
            <span className="line-through">{children}</span>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 text-red-500 px-1.5 py-0.5 rounded font-mono text-sm">
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}
