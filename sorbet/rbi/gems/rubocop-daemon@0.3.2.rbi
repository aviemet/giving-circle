# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `rubocop-daemon` gem.
# Please instead update this file by running `bin/tapioca gem rubocop-daemon`.

# source://rubocop-daemon//lib/rubocop/daemon.rb#3
module RuboCop; end

# source://rubocop-daemon//lib/rubocop/daemon.rb#4
module RuboCop::Daemon
  class << self
    # @return [Boolean]
    #
    # source://rubocop-daemon//lib/rubocop/daemon.rb#17
    def running?; end

    # source://rubocop-daemon//lib/rubocop/daemon.rb#21
    def wait_for_running_status!(expected); end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon/cli.rb#7
class RuboCop::Daemon::CLI
  # source://rubocop-daemon//lib/rubocop/daemon/cli.rb#28
  def parser; end

  # source://rubocop-daemon//lib/rubocop/daemon/cli.rb#15
  def run(argv = T.unsafe(nil)); end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/cli.rb#36
  def create_subcommand_instance(argv); end

  # source://rubocop-daemon//lib/rubocop/daemon/cli.rb#41
  def find_subcommand_class(subcommand); end

  class << self
    # source://rubocop-daemon//lib/rubocop/daemon/cli.rb#8
    def new_parser(&_block); end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon/cache.rb#7
class RuboCop::Daemon::Cache
  class << self
    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#60
    def acquire_lock; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#27
    def dir; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#46
    def lock_path; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#42
    def pid_path; end

    # @return [Boolean]
    #
    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#54
    def pid_running?; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#34
    def port_path; end

    # Searches for Gemfile or gems.rb in the current dir or any parent dirs
    #
    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#10
    def project_dir; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#23
    def project_dir_cache_key; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#50
    def status_path; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#38
    def token_path; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#75
    def write_pid_file; end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#70
    def write_port_and_token_files(port:, token:); end

    # source://rubocop-daemon//lib/rubocop/daemon/cache.rb#82
    def write_status_file(status); end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon/client_command.rb#5
module RuboCop::Daemon::ClientCommand; end

# source://rubocop-daemon//lib/rubocop/daemon/client_command/base.rb#9
class RuboCop::Daemon::ClientCommand::Base
  # @return [Base] a new instance of Base
  #
  # source://rubocop-daemon//lib/rubocop/daemon/client_command/base.rb#10
  def initialize(argv); end

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/base.rb#15
  def run; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/base.rb#28
  def check_running_server; end

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/base.rb#34
  def ensure_server!; end

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/base.rb#19
  def send_request(command:, args: T.unsafe(nil), body: T.unsafe(nil)); end
end

# source://rubocop-daemon//lib/rubocop/daemon/client_command/exec.rb#6
class RuboCop::Daemon::ClientCommand::Exec < ::RuboCop::Daemon::ClientCommand::Base
  # source://rubocop-daemon//lib/rubocop/daemon/client_command/exec.rb#7
  def run; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/exec.rb#27
  def exit_with_status!; end

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/exec.rb#21
  def parser; end
end

# source://rubocop-daemon//lib/rubocop/daemon/client_command/restart.rb#6
class RuboCop::Daemon::ClientCommand::Restart < ::RuboCop::Daemon::ClientCommand::Base
  # source://rubocop-daemon//lib/rubocop/daemon/client_command/restart.rb#7
  def run; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/restart.rb#16
  def parser; end
end

# source://rubocop-daemon//lib/rubocop/daemon/client_command/start.rb#6
class RuboCop::Daemon::ClientCommand::Start < ::RuboCop::Daemon::ClientCommand::Base
  # source://rubocop-daemon//lib/rubocop/daemon/client_command/start.rb#7
  def run; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/start.rb#28
  def parser; end
end

# source://rubocop-daemon//lib/rubocop/daemon/client_command/status.rb#6
class RuboCop::Daemon::ClientCommand::Status < ::RuboCop::Daemon::ClientCommand::Base
  # source://rubocop-daemon//lib/rubocop/daemon/client_command/status.rb#7
  def run; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/status.rb#19
  def parser; end
end

# source://rubocop-daemon//lib/rubocop/daemon/client_command/stop.rb#6
class RuboCop::Daemon::ClientCommand::Stop < ::RuboCop::Daemon::ClientCommand::Base
  # source://rubocop-daemon//lib/rubocop/daemon/client_command/stop.rb#7
  def run; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/client_command/stop.rb#17
  def parser; end
end

# source://rubocop-daemon//lib/rubocop/daemon/errors.rb#5
class RuboCop::Daemon::GemfileNotFound < ::StandardError; end

# source://rubocop-daemon//lib/rubocop/daemon/helper.rb#5
module RuboCop::Daemon::Helper
  class << self
    # source://rubocop-daemon//lib/rubocop/daemon/helper.rb#6
    def redirect(stdin: T.unsafe(nil), stdout: T.unsafe(nil), stderr: T.unsafe(nil), &_block); end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon/errors.rb#6
class RuboCop::Daemon::InvalidTokenError < ::StandardError; end

# source://rubocop-daemon//lib/rubocop/daemon/server.rb#9
class RuboCop::Daemon::Server
  # @return [Server] a new instance of Server
  #
  # source://rubocop-daemon//lib/rubocop/daemon/server.rb#16
  def initialize(verbose); end

  # source://rubocop-daemon//lib/rubocop/daemon/server.rb#24
  def start(port); end

  # source://rubocop-daemon//lib/rubocop/daemon/server.rb#20
  def token; end

  # Returns the value of attribute verbose.
  #
  # source://rubocop-daemon//lib/rubocop/daemon/server.rb#10
  def verbose; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/server.rb#41
  def read_socket(socket); end

  # source://rubocop-daemon//lib/rubocop/daemon/server.rb#36
  def start_server(port); end

  class << self
    # source://rubocop-daemon//lib/rubocop/daemon/server.rb#12
    def token; end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon/server_command.rb#5
module RuboCop::Daemon::ServerCommand; end

# source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#6
class RuboCop::Daemon::ServerCommand::Base
  # @return [Base] a new instance of Base
  #
  # source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#20
  def initialize(args, token: T.unsafe(nil), cwd: T.unsafe(nil)); end

  # source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#26
  def run; end

  private

  # @raise [InvalidTokenError]
  #
  # source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#30
  def validate_token!; end

  class << self
    # @private
    #
    # source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#16
    def inherited(child); end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#7
module RuboCop::Daemon::ServerCommand::Base::Runner
  # source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#8
  def run; end
end

# source://rubocop-daemon//lib/rubocop/daemon/server_command/exec.rb#6
class RuboCop::Daemon::ServerCommand::Exec < ::RuboCop::Daemon::ServerCommand::Base
  include ::RuboCop::Daemon::ServerCommand::Base::Runner

  # source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#8
  def run; end
end

# source://rubocop-daemon//lib/rubocop/daemon/server_command/stop.rb#6
class RuboCop::Daemon::ServerCommand::Stop < ::RuboCop::Daemon::ServerCommand::Base
  include ::RuboCop::Daemon::ServerCommand::Base::Runner

  # @raise [ServerStopRequest]
  #
  # source://rubocop-daemon//lib/rubocop/daemon/server_command/base.rb#8
  def run; end
end

# source://rubocop-daemon//lib/rubocop/daemon/errors.rb#7
class RuboCop::Daemon::ServerStopRequest < ::StandardError; end

# source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#5
class RuboCop::Daemon::SocketReader
  # @return [SocketReader] a new instance of SocketReader
  #
  # source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#9
  def initialize(socket, verbose); end

  # source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#14
  def read!; end

  private

  # source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#43
  def create_command_instance(request); end

  # source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#53
  def find_command_class(command); end

  # source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#38
  def parse_header(header); end

  # source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#28
  def parse_request(content); end
end

# source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#7
class RuboCop::Daemon::SocketReader::Header < ::Struct
  # Returns the value of attribute args
  #
  # @return [Object] the current value of args
  def args; end

  # Sets the attribute args
  #
  # @param value [Object] the value to set the attribute args to.
  # @return [Object] the newly set value
  def args=(_); end

  # Returns the value of attribute command
  #
  # @return [Object] the current value of command
  def command; end

  # Sets the attribute command
  #
  # @param value [Object] the value to set the attribute command to.
  # @return [Object] the newly set value
  def command=(_); end

  # Returns the value of attribute cwd
  #
  # @return [Object] the current value of cwd
  def cwd; end

  # Sets the attribute cwd
  #
  # @param value [Object] the value to set the attribute cwd to.
  # @return [Object] the newly set value
  def cwd=(_); end

  # Returns the value of attribute token
  #
  # @return [Object] the current value of token
  def token; end

  # Sets the attribute token
  #
  # @param value [Object] the value to set the attribute token to.
  # @return [Object] the newly set value
  def token=(_); end

  class << self
    def [](*_arg0); end
    def inspect; end
    def keyword_init?; end
    def members; end
    def new(*_arg0); end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon/socket_reader.rb#6
class RuboCop::Daemon::SocketReader::Request < ::Struct
  # Returns the value of attribute body
  #
  # @return [Object] the current value of body
  def body; end

  # Sets the attribute body
  #
  # @param value [Object] the value to set the attribute body to.
  # @return [Object] the newly set value
  def body=(_); end

  # Returns the value of attribute header
  #
  # @return [Object] the current value of header
  def header; end

  # Sets the attribute header
  #
  # @param value [Object] the value to set the attribute header to.
  # @return [Object] the newly set value
  def header=(_); end

  class << self
    def [](*_arg0); end
    def inspect; end
    def keyword_init?; end
    def members; end
    def new(*_arg0); end
  end
end

# source://rubocop-daemon//lib/rubocop/daemon.rb#5
RuboCop::Daemon::TIMEOUT = T.let(T.unsafe(nil), Integer)

# source://rubocop-daemon//lib/rubocop/daemon/errors.rb#8
class RuboCop::Daemon::UnknownClientCommandError < ::StandardError; end

# source://rubocop-daemon//lib/rubocop/daemon/errors.rb#9
class RuboCop::Daemon::UnknownServerCommandError < ::StandardError; end

# source://rubocop-daemon//lib/rubocop/daemon/version.rb#5
RuboCop::Daemon::VERSION = T.let(T.unsafe(nil), String)
