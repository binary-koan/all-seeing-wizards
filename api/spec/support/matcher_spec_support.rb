RSpec::Matchers.define :broadcast_to do |channel, data, options = {}|
  match do |block|
    expect(channel).to receive(:broadcast_to).with(options[:to] || anything, data)
    block.call
    true
  end

  supports_block_expectations
end

RSpec::Matchers.define :be_array_of do |type, options = {}|
  match do |actual|
    actual.each { |item| expect(item).to be_a(type) }
    options.each { |name, value| expect(actual.send(name)).to eq value }
    true
  end
end

RSpec::Matchers.alias_matcher :array_of, :be_array_of

RSpec::Matchers.define :be_called_with do |*args|
  match do |service|
    double = instance_double(service)

    expect(service).to receive(:new).with(*args).and_return(double)
    expect(double).to receive(:call)
    true
  end
end
