class VotesController < ApplicationController
  include Searchable

  expose :votes, -> { search(Vote.includes_associated, sortable_fields) }
  expose :vote, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /votes
  def index
    authorize votes

    paginated_votes = paginate(votes, :votes)

    render inertia: "Votes/Index", props: {
      votes: -> { paginated_votes.render(:index) },
      pagination: -> { {
        count: votes.size,
        **pagination_data(paginated_votes)
      } },
    }
  end

  # GET /votes/:id
  def show
    authorize vote
    render inertia: "Votes/Show", props: {
      vote: -> { vote.render(:show) }
    }
  end

  # GET /votes/new
  def new
    authorize Vote.new
    render inertia: "Votes/New", props: {
      vote: Vote.new.render(:form_data)
    }
  end

  # GET /votes/:id/edit
  def edit
    authorize vote
    render inertia: "Votes/Edit", props: {
      vote: vote.render(:edit)
    }
  end

  # POST /votes
  def create
    authorize Vote.new
    if vote.save
      redirect_to vote, notice: "Vote was successfully created."
    else
      redirect_to new_vote_path, inertia: { errors: vote.errors }
    end
  end

  # PATCH/PUT /votes/:id
  def update
    authorize vote
    if vote.update(vote_params)
      redirect_to vote, notice: "Vote was successfully updated."
    else
      redirect_to edit_vote_path, inertia: { errors: vote.errors }
    end
  end

  # DELETE /votes/:id
  def destroy
    authorize vote
    vote.destroy!
    redirect_to votes_url, notice: "Vote was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name type).freeze
  end

  def vote_params
    params.require(:vote).permit(:name, :type)
  end
end
