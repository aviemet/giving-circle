if Presentation::Element.none?
  Presentation::Element.create!({
    name: "Orgs Bar Graph",
    slug: "orgs-bar-graph",
    data: {
      type: "bar_graph_allocated_totals",
      title: "Allocated Totals",
    },
    template: true,
  })

  Presentation::Element.create!({
    name: "Timer",
    data: { type: "timer" },
    template: true,
  })
end
