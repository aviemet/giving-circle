require "rails/generators/rails/scaffold/scaffold_generator"

class AllGenerator < Rails::Generators::ScaffoldGenerator
  def add_extra_components
    # Call the original scaffold generator
    invoke_all

    # Add Pundit policy
    invoke "pundit:policy", [name.singularize], behavior: behavior

    # Add serializer
    invoke "serializer", [name.singularize], behavior: behavior
  end

  def self.exit_on_failure?
    true
  end
end
