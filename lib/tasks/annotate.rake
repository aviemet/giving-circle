namespace :annotate do
  desc "Annotate models and fixtures with database schema"
  task :models => [:environment] do
    system("bundle exec annotaterb models")
  end

  desc "Annotate controllers with route information"
  task :routes => [:environment] do
    system("rails js:routes")
    system("rails url_params:generate")
    system("chusaku")
  end

  task :all => [:routes, :models]
end
