import yaml

def compose(out_file, base_file, paths_files):
	base = load_base(base_file)
	base['paths'] = {}
	for file in paths_files:
		with open(file, 'r') as stream:
			try:
				paths = yaml.safe_load(stream)['paths'] # {'/policies' : {...}, '/policies/{policyId}' : {...} }
				for path in paths.keys():
					base['paths'][path] = paths[path]			# assign above ^ to {'paths' : {...} }
			except yaml.YAMLError as e: print(e)
		stream.close()
	status = write_yaml(out_file, base)
	return status, base

def load_base(base_file):
	with open(base_file, 'r') as stream:
		try: base = yaml.safe_load(stream)
		except yaml.YAMLError as e: print(e)
	stream.close()
	return base

def write_yaml(out_file, data):
	with open(out_file, 'w') as stream:
		try: yaml.safe_dump(data, stream)
		except yaml.YAMLError as e: print(e)
	stream.close()
	return 'OK'

if __name__ == "__main__":
	base_file = 'gateway-v3-base.yaml'
	path_files = [
		'paths/policy/gateway-v3-policies.yaml',
		'paths/policy/gateway-v3-expenses.yaml',
		'paths/policy/gateway-v3-approved.yaml',
		'paths/transaction/gateway-v3-transactions.yaml',
		'paths/transaction/gateway-v3-histories.yaml',
		'paths/transaction/gateway-v3-images.yaml',
		'paths/user/gateway-v3-locations.yaml',
		'paths/user/gateway-v3-roles.yaml',
		'paths/user/gateway-v3-users.yaml',
		'paths/gateway-v3-analytics.yaml'
	]
	status, _ = compose("gateway-v3.13.yaml", base_file, path_files)
	print(status)
