export default function RecentPosts() {

  const posts = [
    { title: "How to stay consistent", status: "Processing", time: "2 min ago" },
    { title: "AI in daily life", status: "Done", time: "10 min ago" },
    { title: "Building discipline", status: "Done", time: "1 hour ago" },
    { title: "Why habits matter", status: "Draft", time: "Yesterday" },
    { title: "Future of AI", status: "Done", time: "2 days ago" },
  ]

  return (
    <section className="
      rounded-2xl p-6

      border border-black/10 dark:border-white/10
    ">

      <div className="flex justify-between mb-6">
        <h2 className="text-lg font-medium text-black dark:text-white">
          Recent Posts
        </h2>
        <span className="text-sm opacity-60 cursor-pointer hover:opacity-100">
          See All
        </span>
      </div>

      <table className="w-full text-left text-sm">

        <thead className="opacity-60">
          <tr>
            <th className="py-2">Title</th>
            <th>Status</th>
            <th>Last Edit</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post, i) => (
            <tr key={i} className="border-t border-black/10 dark:border-white/10">

              <td className="py-3 text-black dark:text-white">
                {post.title}
              </td>

              <td>
                <span
                  className={`
                  px-2 py-1 rounded-full text-xs
                  ${
                    post.status === "Done"
                      ? "bg-green-500/20 text-green-400"
                      : post.status === "Processing"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                  `}
                >
                  {post.status}
                </span>
              </td>

              <td className="opacity-60">{post.time}</td>

            </tr>
          ))}
        </tbody>

      </table>

    </section>
  )
}
