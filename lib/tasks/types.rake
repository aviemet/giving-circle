namespace :types do
  desc "Generate TypeScript interfaces from serializers"
  task :generate => [:environment] do
    system("rails types_from_serializers:generate")
  end
end
