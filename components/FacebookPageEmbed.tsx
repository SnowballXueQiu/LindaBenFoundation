export default function FacebookPageEmbed() {
  return (
    <section className="py-8" style={{ background: "var(--cream)" }}>
      <div className="flex w-full justify-center px-6">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FLindabenFoundation%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="340"
          height="500"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Lindaben Foundation Facebook Feed"
          loading="lazy"
        />
      </div>
    </section>
  );
}
