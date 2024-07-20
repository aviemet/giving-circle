require 'action_dispatch/routing/inspector'
require_relative '../url_params_json'

namespace :url_params do
  desc "Generate urlParams.js file"
  task generate: :environment do
    UrlParamsJson::Generator.generate
  end
end
