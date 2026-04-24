import React from "react";

export default function PageHeader({
  title = "Dashboard",
  breadcrumb = "Dashboard",
  children,
}) {
  const breadcrumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium">
          <span className="text-gray-400">Home</span>

          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <span className="text-gray-300">/</span>
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "text-hijau"
                    : "text-gray-400"
                }
              >
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}