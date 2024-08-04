require_relative "scaffold/scaffold_generator"

class TsxGenerator < Tsx::Generators::ScaffoldGenerator
  source_root File.expand_path("scaffold/templates", __dir__)
end
