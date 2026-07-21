desc "Prepare the codebase for development by running all code generation tasks (TS types, JS routes, etc.)"
task prepare: :environment do
  # Generate TS types from serializers
  Rake::Task["types:generate"].invoke
  # Generate javascript route helpers from routes.rb
  Rake::Task["js:routes"].invoke
  # Generate TS params types for page props
  Rake::Task["url_params:generate"].invoke
  # Generate frontend locale files
  Rake::Task["i18n:export"].invoke
  Rake::Task["i18n:locale_registry"].invoke
  # Annotate files
  system("chusaku")
  Rake::Task["annotate:models"].invoke
end
